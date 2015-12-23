import React, { Component, PropTypes } from 'react';

export default class Task extends Component {
	handleToggleComplete(e) {
		this.props.onSetCompleted(!this.props.completed);
	}

	handleDelete(e) {
		e.preventDefault();

		this.props.onDelete();
	}

	render() {
		let { id, text, completed } = this.props;
		let className = completed ? "task completed" : "task";
		let toggleID = "task-toggle-" + id;
		return <li className={ className }>
			<div className="complete-toggle">
				<input type="checkbox" checked={ completed }
					id={ toggleID }
					onClick={ (e) => this.handleToggleComplete(e) } />
				<label htmlFor={ toggleID }><i className="ion-checkmark"></i></label>
			</div>

			<span className="title">
				{this.props.text}

				{this.props.start ? (
					this.props.start
				) : ""}
			</span>

			<span className="actions">
				<button onClick={(e) => this.handleDelete(e) }>
					<i className="ion-trash-b"></i>
					<span className="text">Delete</span>
				</button>
			</span>
		</li>;
	}
}

Task.propTypes = {
	onDelete: PropTypes.func.isRequired,
	onSetCompleted: PropTypes.func.isRequired,
};
