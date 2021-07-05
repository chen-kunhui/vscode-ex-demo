interface TextArea {
    value: string;
    selectionStart: number
    selectionEnd: number
    focus(): void
    setSelectionRange(start: number, end: number): void
}

interface SyntaxHandle {
    (text: string): SyntaxHandleResult;
}

interface OffsetSelectionRange {
    startPostion: number,
    endPostion: number
}

interface SyntaxHandleResult {
    text: string,
    selectionRange: OffsetSelectionRange
}

interface Handlers {
    [action: string]: SyntaxHandle
}

export function addMarkdownSyntax(textarea: TextArea, action: string) {
    let text = textarea.value;
    let selectionStart = textarea.selectionStart;
    let selectionEnd = textarea.selectionEnd;
    let selectionText = text.substring(selectionStart, selectionEnd);
    let prefixText = text.substring(0, selectionStart);
    let suffixText = text.substring(selectionEnd);

    let insertTextInfo: SyntaxHandleResult = formatText(selectionText, action);

    text = prefixText + insertTextInfo.text + suffixText
    textarea.value = text;

    textarea.focus()
    textarea.setSelectionRange(
        prefixText.length + insertTextInfo.selectionRange.startPostion,
        prefixText.length + insertTextInfo.selectionRange.endPostion
    )
}

const handlers: Handlers = {
    'add_title': addHeader,
    'blod_text': blodText,
    'add_quote': addQuote,
    'insert_code': insertCode,
    'add_link': addLink,
    'add_list': addList,
    'add_todo_list': addTodoList
}

function formatText(selectionText: string, action: string): SyntaxHandleResult {
    let handler: SyntaxHandle | undefined = handlers[action];
    let result = {
        text: selectionText,
        selectionRange: {
            startPostion: 0,
            endPostion: 0
        }
    };
    if (handler !== undefined) {
        result = handler.call(undefined, selectionText);
    }
    return result;
}

function addHeader(text: string): SyntaxHandleResult {
    let strings = text.split("\n");
    let result = [""]
    for(let txt of strings) {
        result.push(`### ${txt}`)
    }
    text = result.join("\n");
    return {
        text: text,
        selectionRange: {
            startPostion: 5,
            endPostion: text.length
        }
    };
}


function blodText(text: string): SyntaxHandleResult {
    text = `***${text}***`;
    return {
        text: text,
        selectionRange: {
            startPostion: 3,
            endPostion: text.length - 3
        }
    };
}

function addQuote(text: string): SyntaxHandleResult {
    let strings = text.split("\n");
    let result = [""]
    for(let txt of strings) {
        result.push(`> ${txt}`)
    }
    text = result.join("\n");
    return {
        text: text,
        selectionRange: {
            startPostion: 3,
            endPostion: text.length
        }
    };
}

function addLink(text: string): SyntaxHandleResult {
    text = `${text}[](https://www.example.com)`;
    return {
        text: text,
        selectionRange: {
            startPostion: 1,
            endPostion: text.length - "](https://www.example.com)".length
        }
    };
}

function addList(text: string): SyntaxHandleResult {
    let strings = text.split("\n");
    let result = [""]
    for(let txt of strings) {
        result.push(`- ${txt}`)
    }
    text = result.join("\n");
    return {
        text: text,
        selectionRange: {
            startPostion: 3,
            endPostion: text.length
        }
    };
}

function insertCode(text: string): SyntaxHandleResult {
    let strings = text.split("\n");
    if(strings.length > 1) {
        text = "\n```\n" + strings.join("\n") + "\n```\n";
        return {
            text: text,
            selectionRange: {
                startPostion: 5,
                endPostion: text.length - 5
            }
        };
    }
    text = "`" + strings.join("\n") + "`";
    return {
        text: text,
        selectionRange: {
            startPostion: 1,
            endPostion: text.length - 1
        }
    };
}

function addTodoList(text: string): SyntaxHandleResult {
    let strings = text.split("\n");
    let result = [""]
    for(let txt of strings) {
        result.push(`-[ ] ${txt}`)
    }
    text = result.join("\n");
    return {
        text: text,
        selectionRange: {
            startPostion: 6,
            endPostion: text.length
        }
    };
}