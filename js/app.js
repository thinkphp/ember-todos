window.Todos = Ember.Application.create()

Todos.Todo = Ember.Object.extend({

      title: null,

      isDone: false 
})


Todos.Controller = Ember.Object.create({


      //we need an array to hold our tasks objects
      todos: Ember.A(),

      init: function() {

            var tasks = this.get('todos')
            tasks.addObject(Todos.Todo.create({title: 'This is an Ember task!'}))   
            tasks.addObject(Todos.Todo.create({title: 'This is another Ember task!'}))
            tasks.addObject(Todos.Todo.create({title: 'This is another Ember task!'}))
            tasks.addObject(Todos.Todo.create({title: 'This is another Ember task!'}))
            tasks.addObject(Todos.Todo.create({title: 'This is another Ember task!'}))
      },

      addTask: function( title ) {

            this.get('todos').addObject( Todos.Todo.create({title: title}) )

            this.set('value', '');
      },


      markAllComplete: function() {

		this.get('todos').setEach('isDone', true);
      },

	completedCount: function() {

		return this.get('todos').filterProperty('isDone').length;

	}.property('todos.@each.isDone'),

	clearCompleted: function() {

		var todos = this.get('todos');

		todos.removeObjects(todos.filterProperty('isDone'));
	},

	remainingCount: function() {

		return this.get('todos').filterProperty('isDone', false).length;

	}.property('todos.@each.isDone')
})

Todos.CreateTodoView = Ember.TextField.extend({

      insertNewline: function() {

            var value = this.get('value');

            if( value ) {

                Todos.Controller.addTask( value )

                this.set('value', '')
            }  
      }
})


Todos.MarkAllCompleteView = Ember.Checkbox.extend({

	remainingCountBinding: 'Todos.Controller.remainingCount',
	
	disabled: function() {

		return this.get('remainingCount') === 0;

	}.property('remainingCount'),

	deselect: function() {

		if (this.get('remainingCount') !== 0) {

			this.set('value', false);
		}

	}.observes('remainingCount'),

	markAllComplete: function() {

		if (this.get('value')) {

			Todos.Controller.markAllComplete();
		}
	}.observes('value')
});