import React, { Component, PropTypes } from 'react';
import Task from './Task';
import NewTask from './NewTask';

export default class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showingNewTask: false,
		};
	}

	showNew(e) {
		e.preventDefault();

		this.setState({
			showingNewTask: ! this.state.showingNewTask,
		});
	}

	render() {
		let { onAdd, onSetCompleted, onDelete } = this.props;
		let { showingNewTask } = this.state;

		let className = showingNewTask ? "tasklist showing-new" : "tasklist";

		return <div>
			<ul className={ className }>
				{this.props.items.length ?
					this.props.items.map((item, index) =>
						<Task {...item} key={index}
							onSetCompleted={ (complete) => onSetCompleted(item.id, complete) }
							onDelete={ (e) => onDelete(item.id) } />
					)
					:
					<li className="no-items">No tasks, enjoy your day!</li>
				}
				<li className="actions">
					<span title="Add new task" onClick={ (e) => this.showNew(e) }>
						<i className="ion-plus-circled"></i>
					</span>
					{ /*
					<span className="view-toggle">
						<div>
							<input type="radio" name="view-toggle" value="all" checked />
							<label><i className="ion-asterisk" title="Show all"></i></label>
						</div>
						<div>
							<input type="radio" name="view-toggle" value="remaining" />
							<label><i className="ion-android-checkbox-outline-blank" title="Show remaining"></i></label>
						</div>
						<div>
							<input type="radio" name="view-toggle" value="completed" />
							<label><i className="ion-android-checkbox-outline" title="Show completed"></i></label>
						</div>
					</span>
					<span title="Clear all">
						<i className="ion-trash-b"></i>
					</span>
					*/ }
				</li>
				<li className="task new">
					<NewTask onSubmit={this.props.onAdd} />
				</li>
			</ul>
		</div>;
	}
}

TaskList.propTypes = {
	onAdd: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onSetCompleted: PropTypes.func.isRequired,
};
