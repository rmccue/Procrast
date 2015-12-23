import React, { Component, PropTypes } from 'react';

export default class NewTask extends Component {
	handleSubmit(e) {
		e.preventDefault();

		const nameEl = this.refs.name;
		const text = nameEl.value.trim();
		this.props.onSubmit(text);
		nameEl.value = '';
	}

	render() {
		return <form className="newtask" onSubmit={(e) => this.handleSubmit(e)}>
			<input type="text" ref="name"
				className="nameInput" placeholder="Add Task" />
			<div className="due">
				<label>Starting
					<input type="text" ref="start"
						className="start" />
				</label>
				<label>until
					<input type="text" ref="end"
						className="end" />
				</label>
			</div>
			<button type="submit" style={ { visibility: "hidden" } } />
		</form>;
	}
}

NewTask.propTypes = {
	onSubmit: PropTypes.func.isRequired
};
