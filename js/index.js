/*
/        block for map json realtime
*/
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSONblock = React.createClass({
	displayName: 'JSONblock',

	contextTypes: {
		value: React.PropTypes.string.isRequired
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'jsonBlock' },
			React.createElement(
				'pre',
				null,
				this.context.value
			)
		);
	}
});

/*
/ Line for entry name
/
*/
var Namerow = React.createClass({
	displayName: 'Namerow',

	getInitialState: function getInitialState() {
		return { value: '' };
	},
	onchange: function onchange(event) {
		var str = event.target.value;
		if (!isNaN(str[str.length - 1]) || str.length > 50) {
			//  only letters , no more 50
			event.target.value = str.slice(0, -1);
			return;
		}
		this.props.takeElemData({ name: 'name', value: str });
	},
	render: function render() {
		return React.createElement('input', { type: 'text', onChange: this.onchange, className: 'form-control',
			pattern: '[а-яА-ЯёЁa-zA-Z]{2,50}', placeholder: 'Enter your name' });
	}
});

/*
/   added lines for offer selec
*/
var OfferAdd = React.createClass({
	displayName: 'OfferAdd',

	getInitialState: function getInitialState() {
		return { value: '', file_id: 0 };
	},
	onchange: function onchange(event) {
		var sum = event.target.value;
		if (isNaN(sum[sum.length - 1]) && !(sum.charCodeAt(sum.length - 1) == 46) || sum.length > 10) {
			// only digits for amount
			event.target.value = sum.slice(0, -1);
			return;
		}
		sum = parseFloat(sum).toFixed(2);
		this.setState({ value: sum });

		this.props.takeElemData({ name: 'offer', value: { sum: sum, file_id: this.state.file_id } });
	},
	selectfile: function selectfile(event) {
		var file_id = 10; // "generic" some id
		this.setState({ file_id: file_id });
		this.props.takeElemData({ name: 'offer', value: { sum: this.state.value, file_id: file_id } });
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement('br', null),
			React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Amount', onChange: this.onchange }),
			React.createElement('input', { type: 'file', className: 'form-inline', placeholder: 'Select File', onChange: this.selectfile })
		);
	}
});

/*
/   added lines for contract choose
*/
var ContractAdd = React.createClass({
	displayName: 'ContractAdd',

	getInitialState: function getInitialState() {
		var today = moment().format('DD.MM.YYYY'); // moment.js library
		var number = 'BG2234'; // "genering" order ID

		this.props.takeElemData({ name: 'contract', value: { number: number, date: today } });
		return { date: today,
			number: number
		};
	},
	render: function render() {
		console.log(this.state.number + " " + this.state.date);

		return React.createElement(
			'div',
			{ className: 'form-group' },
			React.createElement(
				'label',
				null,
				'Order# ',
				this.state.number
			),
			React.createElement('br', null),
			React.createElement(
				'label',
				null,
				'Date: ',
				this.state.date,
				' '
			)
		);
	}
});

/*
/ phone list 
*/

var Phoneselect = React.createClass({
	displayName: 'Phoneselect',

	onchange: function onchange(event) {
		var listItem = document.getElementById('phone_list');
		var id = event.target.value == listItem.options[0].value ? 1 : event.target.value == listItem.options[1].value ? 2 : event.target.value == listItem.options[2].value ? 3 : event.target.value == listItem.options[3].value ? 4 : 0;
		if (id) {
			this.props.takeElemData({ name: 'phone_id', value: id });
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'col-sm-4' },
			React.createElement(
				'label',
				null,
				'+38',
				React.createElement('input', { type: 'tel', list: 'phone_list', className: 'form-inline',
					pattern: '[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}', placeholder: 'XXX-XX-XX-XXX ',
					onChange: this.onchange })
			),
			React.createElement(
				'datalist',
				{ id: 'phone_list' },
				React.createElement(
					'option',
					{ id: '1' },
					'050-55-44-789'
				),
				React.createElement(
					'option',
					{ id: '2' },
					'067-55-44-789'
				),
				React.createElement(
					'option',
					{ id: '3' },
					'099-55-44-789'
				),
				React.createElement(
					'option',
					{ id: '4' },
					'063-55-44-789'
				)
			)
		);
	}
});

/*
/
/  select list for activity choose
*/
var Actselect = React.createClass({
	displayName: 'Actselect',

	getInitialState: function getInitialState() {
		return { activity_id: 0 };
	},
	onchange: function onchange(event) {
		var e = event.target[event.target.selectedIndex].value;
		this.setState({ activity_id: e });
		this.props.takeElemData({ name: 'activity_id', value: e });
	},
	render: function render() {
		var self = this;

		return React.createElement(
			'div',
			{ className: 'col-sm-4' },
			React.createElement(
				'select',
				{ className: 'form-control', onChange: this.onchange },
				React.createElement(
					'option',
					null,
					'Activity'
				),
				React.createElement(
					'option',
					{ value: '1' },
					'Call'
				),
				React.createElement(
					'option',
					{ value: '2' },
					'Meeting'
				),
				React.createElement(
					'option',
					{ value: '3' },
					'Offer'
				),
				React.createElement(
					'option',
					{ value: '4' },
					'Contract'
				)
			),
			this.state.activity_id == 3 ? React.createElement(OfferAdd, { takeElemData: self.props.takeElemData }) : null,
			this.state.activity_id == 4 ? React.createElement(ContractAdd, { takeElemData: self.props.takeElemData }) : null
		);
	}
});

/*
/ conteints photo block
*/
var Photoblock = React.createClass({
	displayName: 'Photoblock',

	getInitialState: function getInitialState() {
		return { src: 'img/default.png' };
	},
	onchange: function onchange(event) {
		var path = event.target.value;
		this.setState({ src: path });
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'col-sm-4' },
			React.createElement('img', { src: this.state.src, height: '220', width: '180', alt: 'Your photo. 0_0' }),
			React.createElement('input', { type: 'file', onChange: this.onchange })
		);
	}
});

/*
/
/ From for submit
*/

var Formact = React.createClass({
	displayName: 'Formact',

	getInitialState: function getInitialState() {
		// the state object fields will be lines of json
		return {
			name: null,
			phone_id: null,
			activity_id: null,
			contract: {
				number: null,
				date: null
			},
			offer: {
				sum: null,
				file_id: null
			}
		};
	},

	childContextTypes: { // context only for map json block
		value: React.PropTypes.string.isRequired
	},
	getChildContext: function getChildContext() {
		return { value: JSON.stringify(this.state, "", 4) };
	},
	/*
 / @param {Object} conteins value for state object fields
 / writing data from forms elements in state fields
 */

	takeElemData: function takeElemData(field) {
		this.setState(_defineProperty({}, field.name, field.value));
	},
	onsubmit: function onsubmit() {
		var Data = JSON.stringify(this.state, "", 4);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/url", true);
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');;
		xhr.send(Data);
	},
	render: function render() {
		var self = this;
		return React.createElement(
			'div',
			null,
			React.createElement(
				'form',
				{ role: 'form', className: 'container' },
				React.createElement(Namerow, { takeElemData: self.takeElemData }),
				React.createElement('br', null),
				React.createElement('br', null),
				React.createElement(Phoneselect, { takeElemData: self.takeElemData }),
				React.createElement(Actselect, { takeElemData: self.takeElemData }),
				React.createElement(Photoblock, null),
				React.createElement('input', { type: 'submit', value: 'Submit', className: ' btn-lg col-sm-4', onSubmit: this.onsubmit })
			),
			React.createElement(JSONblock, { data: self.state })
		);
	}
});

React.render(React.createElement(Formact, null), document.body);