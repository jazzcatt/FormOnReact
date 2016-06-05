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
/ the form for selecting and creating preview
/
*/
var Selectfile = React.createClass({

/*
/@params image{Object} object Image() which conteins download image paramerers
/@params a{number} reduction index
/ creating miniature of downloading photo
*/	
  makePreview : function (image, a) {    
	    var img = image,
	    w = img.width, h = img.height,
	    s = w / h;     
	 
  	if(w > a && h > a) {
	    if(img.width > img.height) {
	      img.width = a;
	      img.height = a / s;
	    } else {
	      img.height = a;
	      img.width = a * s;
	    }
 	}
  	return img;
},

/*
/   show download progress,
/   include nimiature in page element
/
*/
 	previewFile: function (e){
 		var makePreview = this.makePreview;                // take makePreview method from closure
		var progressBar = document.querySelector('#progress');
		var preview = document.querySelector('#img');
		var file    = e.target.files[0];
		var reader  = new FileReader();
		var image = new Image();

	if(/image.*/.test(file.type)){								//  only img files
		document.getElementById('photoblock').style.display = 'block';

	    reader.onloadend = function () {
	    image.src = reader.result;
	    image = makePreview(image, 180);						//creating miniature

	    preview.width = image.width;
	    preview.height = image.height;
	    preview.src = reader.result;
	    document.getElementById('ok_ico').style.display = 'block';  
	
    }
 reader.onprogress = function (e) {          					// show progressing of download file
 var loaded = Math.round((e.loaded / e.total) * 100);
 progressBar.value = loaded;          
}

if (file) {														// get file in base64 represent 
  reader.readAsDataURL(file);
	}

  }else{ alert('You must select image file')}
},
	onchange: function(e) {
		this.previewFile(e);
	},
	render: function() {
		return(
			<input type='file' className='form-inline' placeholder='Select File' onChange={this.onchange} />
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
	render: function() {

		return(
			<div className='form-group'>
			<br />
			<input type='text' className='form-control' placeholder='Amount' onChange={this.onchange} /> 
			<Selectfile />
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
				<Selectfile />
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
/ contents photo block
*/
var Photoblock = React.createClass({
	render: function() {
		return (
			<div id='photoblock' className='col-sm-4' style={{display:'none'}}>
				<progress  id='progress'style={{width:'180px'}} value="0" min="0" max="100"></progress>
					<img id='ok_ico' src='img/ok_ico.png' width='20' height='20' 
						style={{display:'none',  float:'right'}} />
					<img id='img' alt='Your photo. 0_0' />		  
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
  		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
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
				<br /><br /><br /><br />
				<br /><br /><br /><br />	
				<input type='submit' value='Submit' className=' btn-lg col-sm-4' onSubmit={this.onsubmit} />
			</form>
		    <JSONblock data={self.state}/>
		 </div>
		)
	}
});

React.render(<Formact />, document.body);