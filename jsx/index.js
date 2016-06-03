/*
/        block for map json realtime
*/
var JSONblock = React.createClass({
	contextTypes: {
		value: React.PropTypes.string.isRequired
	},
	render: function() {
		return(
			<div className='jsonBlock'>
			  <pre>{this.context.value}</pre>
			</div>
		)
	}
});

/*
/ Line for entry name
/
*/
var Namerow = React.createClass({
	getInitialState: function() {
		return {value: ''}
	},
	onchange: function(event) {
		var str = event.target.value;
		if(!isNaN(str[str.length-1]) ||  str.length>50){    //  only letters , no more 50
			event.target.value = str.slice(0, -1);
		 	return;
		}
		this.props.takeElemData({name: 'name', value: str});
	},
	render: function() {
		return(
			<input  type='text' onChange={this.onchange} className='form-control' 
			pattern="[а-яА-ЯёЁa-zA-Z]{2,50}" placeholder='Enter your name'/>
		 )
	}
});

/*
/   added lines for offer selec
*/
var OfferAdd = React.createClass({
	getInitialState: function() {
		return { value: '', file_id: 0}
	},
	onchange: function(event) {
		var sum = event.target.value;
		if(isNaN(sum[sum.length-1])&& !(sum.charCodeAt(sum.length-1) == 46)  || sum.length>10){  // only digits for amount
			event.target.value = sum.slice(0, -1);
			return;
		}	
		sum = parseFloat(sum).toFixed(2);
		this.setState({value: sum});

		this.props.takeElemData({name: 'offer', value:{sum: sum, file_id: this.state.file_id}});
	  
	},
	selectfile: function(event) {
		var file_id = 10;                          // "generic" some id
		this.setState({file_id: file_id}); 
		this.props.takeElemData({name: 'offer', value:{sum: this.state.value, file_id: file_id}});

	},
	render: function() {	
		return(
			<div className='form-group'>
			<br />
			<input type='text' className='form-control' placeholder='Amount' onChange={this.onchange} /> 
			<input type='file' className='form-inline' placeholder='Select File' onChange={this.selectfile} />
			</div>
		)
	}
});

/*
/   added lines for contract choose
*/
var ContractAdd = React.createClass({
	getInitialState: function() {
		var today = moment().format('DD.MM.YYYY');    // moment.js library
		var number = 'BG2234';						  // "genering" order ID

		this.props.takeElemData({name: 'contract', value:{ number: number, date: today}});                                          
		return { date: today,
				 number: number                 
		}	
	},
  	render: function() {
  		console.log(this.state.number+" "+ this.state.date);
  		
  		return(
			<div className='form-group'>
				<label>Order# {this.state.number}</label>
				<br />
				<label>Date: {this.state.date} </label>
		    </div>
		)
  	}
});


/*
/ phone list 
*/

var Phoneselect = React.createClass({
	onchange: function(event) {
		var listItem = document.getElementById('phone_list');	
		var id = event.target.value == listItem.options[0].value ? 1:
				 event.target.value == listItem.options[1].value ? 2:
				 event.target.value == listItem.options[2].value ? 3:
				 event.target.value == listItem.options[3].value ? 4: 0;
	if(id) {			 
    this.props.takeElemData({name: 'phone_id', value: id })
 	}
},
	render: function() {
		return(
			<div className='col-sm-4'>

			  <label>
				+38<input type='tel' list='phone_list' className='form-inline' 
			 		pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}" placeholder='XXX-XX-XX-XXX '
			 		onChange={this.onchange}/>
			  </label>

			  <datalist id='phone_list'>
				<option id='1'>050-55-44-789</option>
				<option id='2'>067-55-44-789</option>
				<option id='3'>099-55-44-789</option>
				<option id='4'>063-55-44-789</option>
			  </datalist>
			
			</div>
		)
	}
});

 /*
 /
 /  select list for activity choose
 */
var Actselect = React.createClass({
	getInitialState: function() {
		return { activity_id : 0};
	},
	onchange: function(event) {
		var e = event.target[event.target.selectedIndex].value;
		this.setState({activity_id : e});
		this.props.takeElemData({name : 'activity_id', value : e});		
	},
	render: function() {
			var self = this;
				
		return (
						<div className='col-sm-4'>
			<select className='form-control' onChange={this.onchange}>
				<option>Activity</option>
				<option value='1'>Call</option>
				<option value='2'>Meeting</option>
				<option value='3'>Offer</option>
				<option value='4'>Contract</option>		
			</select>
			{ this.state.activity_id == 3 ? < OfferAdd  takeElemData={self.props.takeElemData}/> : null}
			{ this.state.activity_id == 4 ? <ContractAdd takeElemData={self.props.takeElemData} /> : null}
			</div>
			)
	}
});

/*
/ conteints photo block
*/
var Photoblock = React.createClass({
	getInitialState: function() {
		return {src: 'img/default.png'}
	},
	onchange: function(event) {
		var path = event.target.value;
		this.setState({src: path});
	},
	render: function() {
		return (
			<div className='col-sm-4'>
			  <img src={this.state.src}  height='220' width='180' alt='Your photo. 0_0'/>
			  <input type='file' onChange={this.onchange}/>
			</div>
			)
	}
}); 

/*
/
/ From for submit
*/

var Formact = React.createClass({

	getInitialState: function() {    // the state object fields will be lines of json
		return{
			name: null,
			phone_id: null,
			activity_id: null,
			contract: {
				number: null,
				date: null,
			},
			offer: {
				sum: null,
				file_id: null
			}	  
	    }
	},

	childContextTypes: {                                // context only for map json block 
		value: React.PropTypes.string.isRequired
	},
	getChildContext: function() {
		return {value: JSON.stringify(this.state, "", 4)}
	},
		/*
		/ @param {Object} conteins value for state object fields
		/ writing data from forms elements in state fields
		*/

	takeElemData: function(field) {
		this.setState({ [field.name] : field.value });
	},
	onsubmit: function() {
		var Data = JSON.stringify(this.state, "", 4);
		var xhr = new XMLHttpRequest();
  		xhr.open("POST", "/url", true);
  		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');;
  		xhr.send(Data);
	},
	render: function() {
		var self = this;
		return (
		   <div>
			<form  role='form' className='container'>
				<Namerow  takeElemData={self.takeElemData}/>
			 	<br /><br />
			 	<Phoneselect takeElemData={self.takeElemData}/>	
				<Actselect takeElemData={self.takeElemData}/>
				<Photoblock />
				<input type='submit' value='Submit' className=' btn-lg col-sm-4' onSubmit={this.onsubmit} />
			</form>
		    <JSONblock data={self.state}/>
		 </div>
		)
	}
});

React.render(<Formact />, document.body);