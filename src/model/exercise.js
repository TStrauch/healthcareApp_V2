export var Exercise = (function () {
    function Exercise(id, name, description, duration, goal, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.goal = goal;
        this.image = image;
    }
    ;
    return Exercise;
}());
