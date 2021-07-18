class TodoItem {
    constructor(weather, note) {
        this.weather = weather;
        this.note = note;
        this.timestamp = new Date();
        this.isSaved = false;
    }
}

export default TodoItem;