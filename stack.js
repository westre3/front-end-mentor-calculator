class Stack {
    data = [];

    push(newData) {
        this.data.push(newData);
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        } else {
            return undefined;
        }
    }

    isEmpty() {
        return this.data.length === 0;
    }

    clear() {
        this.data.splice(0, this.data.length);
    }

    length() {
        return this.data.length;
    }
}

export default Stack;
