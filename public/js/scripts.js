Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model

var budget = Backbone.Model.extend({
	defaults: {
		task_name: '',
		desciption: '',
		amount: '',
		created_time: '', 
		updated_time: '',
	}
});

// Backbone Collection

var budgets = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/budgets'
});


var budgets = new budgets();


var budgetView = Backbone.View.extend({
	model: new budget(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.budgets-list-template').html());
	},
	events: {
		'click .edit-budget': 'edit',
		'click .update-budget': 'update',
		'click .cancel': 'cancel',
		'click .delete-budget': 'delete'
	},
	edit: function() {
		$('.edit-budget').hide();
		$('.delete-budget').hide();
		this.$('.update-budget').show();
		this.$('.cancel').show();

		var task_name = this.$('.task_name').html();
		var desciption = this.$('.desciption').html();
		var amount = this.$('.amount').html();
		var created_time = this.$('.created_time').html();
		var updated_time = new Date($.now());
		this.$('.task_name').html('<input type="text" class="form-control task_name-update" value="' + task_name + '">');
		this.$('.desciption').html('<input type="text" class="form-control desciption-update" value="' + desciption + '">');
		this.$('.amount').html('<input type="text" class="form-control amount-update" value="' + amount + '">');
		this.$('.created_time').html('<input type="text" readonly="true" class="form-control created_time-input" value="' + created_time + '">');		
		this.$('.updated_time').html(new Date($.now()));

	},
	update: function(){
			this.model.set({'task_name':this.$('.task_name-update').val(),
				'desciption':this.$('.desciption-update').val(),
				'amount':this.$('.amount-update').val(),
				'updated_time':new Date($.now())
			});

			this.model.save(null, {});
	}, 


	cancel: function() {
		budgetsView.render();
	},

	delete: function() {
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED budget with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete budget!');
			}
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all budgets

var budgetsView = Backbone.View.extend({
	model: budgets,
	el: $('.budgets-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);

		// fetch all the data from mongodb
		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT budget with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get budgets !');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(budget) {
			self.$el.append((new budgetView({model: budget})).render().$el);
		});
		return this;
	}
});

var budgetsView = new budgetsView();

$(document).ready(function() {
	$('.add-budget').on('click', function() {
		var new_budget = new budget({
			task_name: $('.task_name-input').val(),
			desciption: $('.desciption-input').val(),
			amount: $('.amount-input').val(),
			created_time: (new Date($.now())),  
			updated_time: (new Date($.now()))
		});
		$('.task_name-input').val('');
		$('.desciption-input').val('');
		$('.amount-input').val('');

		budgets.add(new_budget);
		new_budget.save(null, {
			success: function(response) {
				console.log('Successfully SAVED budget with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save budget!');
			}
		});
	});
})
