/**
 * 
 * @class ToDo
 * @description A class to provide functionality for a simple todo list application, this is based on the ES6 standard and would requrie to be transcribed to es5 for some browsers using a tool simmilare to babeljs.
 *
 */
class ToDo {

    /**
     * Creates an instance of ToDo.
     * @memberof ToDo
     */
    constructor() {
        $.fn.editable.defaults.mode = 'inline';
        let _self = this;
        this.holder = $("#todo-list");
        this.load().then(() => {
            _self.updateAlert('alert-success', 'Tasks have been loaded');
            this.makeEditable();
            this.addClickEvent();
            this.reloadChecked();
        }).catch(() => {
            _self.updateAlert('alert-info', "No saved tasks to load");
        });
    };

    /**
     * 
     * Loaded saved tasks from local storage.
     * Will reject is there is no tasks.
     * @returns Promise
     * 
     * @memberof ToDo
     */
    load() {
        var _self = this;
        return new Promise((resolve, reject) => {
            let saved = localStorage.getItem('todoList');

            if (saved !== null) {
                _self.holder.html(saved);
                return resolve();
            } else {
                return reject();
            }

        });
    };

    /**
     * 
     * Saves tasks to local storage.
     * @returns Promise
     * 
     * @memberof ToDo
     */
    save() {
        var _self = this;
        return new Promise((resolve, reject) => {
            let toSave = _self.holder.html();
            if (toSave !== undefined && toSave !== null) {
                localStorage.setItem('todoList', toSave);
                return resolve();
            } else {
                return reject();
            }
        });
    };

    /**
     * 
     * Displays an alert with the status and description passed in.
     * The alert will be dismissed after 3 seconds.
     * I would like to change this to a toast msg.
     * @param {any} status - alert status can be one of the following alert-success alert-info alert-warning alert-danger
     * @param {any} description - the text to display in the alert.
     * 
     * @memberof ToDo
     */
    updateAlert(status, description) {
        let validStatus = ['alert-success', 'alert-info', 'alert-warning', 'alert-danger'];
        if (jQuery.inArray(status, validStatus) != -1) {
            $('#alert').show();
            $('#alert').removeClass('alert-success alert-info alert-warning alert-danger');
            $('#alert').addClass(status);
            $('#alertContent').text(description);
            setTimeout(() => {
                $('#alert').hide();
            }, 3000);
        } else {
            throw 'invalid status only alert-success, alert-info, alert-warning, alert-danger';
        }
    };

    /**
     * 
     * Creates a new todo list item 
     * 
     * @param {any} task the text to display
     * 
     * @memberof ToDo
     */
    createTodoItem(task) {

        var inputs = this.holder.find('input');
        var id = inputs.length + 1;
        this.holder.append()
        let li = $('<li />', {
            class: 'list-group-item'
        }).appendTo(this.holder);

        let checkBox = $('<input />', {
            type: 'checkbox',
            id: 'cb' + id,
            value: task,
        });

        checkBox.appendTo(li);

        $('<a />', {
            text: task,
            id: 'text_' + id,
            'class': 'editable editable-click editable-open '
        }).appendTo(li);

        this.makeEditable();
        this.addClickEvent();
        //<span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
    };

    /**
     * 
     * Displays if the input field is valud of not.
     * @param {any} domElement - the dom element to check, current validation is only the dom element has a value.
     * 
     * @memberof ToDo
     */
    updateStatus(domElement) {
        let _self = domElement;
        if (_self.val().trim() !== "") {
            _self.parent().removeClass('has-error').addClass('has-success');
        } else {
            _self.parent().removeClass('has-success').addClass('has-error');
        }
    }

    /**
     * 
     * This function applies the editable functionality to the todo items.
     * This is due to the editor not being applied when loading the items from local storage.
     * @memberof ToDo
     */
    makeEditable() {
        var inputs = this.holder.find('input');
        var id = inputs.length;
        for (let i = 0; i < id; i++) {
            $('#text_' + i).editable({
                type: 'text',
                pk: 1,
                url: '',
                title: 'Edit Task'
            });
        }
    }

    /**
     * 
     * Binds the click event to all checkboxs
     * This is due to dynamic events not being attached when reloading the list from local storage
     * @memberof ToDo
     */
    addClickEvent() {
        $(':checkbox').click((event) => {
            let _self = $(event.currentTarget);
            if (_self[0].checked) {
                _self.parent().addClass('done');
            } else {
                _self.parent().removeClass('done');
            }
        });
    }

    /**
     * 
     * loops through all the checkboxs and reapplies the checked to them as this is lost when reloading from local storage.
     * 
     * @memberof ToDo
     */
    reloadChecked() {
        $.each($(':checkbox'), (index, element) => {
            if ($(element).parent().hasClass('done')) {
                $(element)[0].checked = true;
            }
        });
    }

    /**
     * 
     * Clears the inner html of the todolist.
     * @todo Should we clear the local storage when clearing the todo list?
     * 
     * @memberof ToDo
     */
    clear() {
    debugger;
        this.holder.html("");
    }

}


$(document).ready(function () {
    // create a new instance of the ToDo class
    todo = new ToDo();


    $("#addTask").click(() => {
        let text = $("#todo-text").val();
        if (text.trim() !== "") {
            todo.createTodoItem(text);
        }
        $("#todo-text").val("");
        todo.updateStatus($("#todo-text"));
    })

    $('#todo-text').keyup((event) => {
        todo.updateStatus($(event.currentTarget));
    })

    $('#saveTasks').click(() => {
        todo.save().then(() => {
            todo.updateAlert('alert-success', 'Tasks have been saved');
        }).catch(() => {
            todo.updateAlert('alert-error', "Sorry can't save your tasks right now");
        });
    })

    $('#clearTasks').click(() => {
        todo.clear();
    });
});
