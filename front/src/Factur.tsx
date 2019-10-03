import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment'

export class Factur extends React.Component<any,any> {
  state = {
    date: new Date(),
    title: '',
    name: '',
    surName: '',
    netto: ''
  };
  constructor(props:any){
    super(props)
    this.submitting = this.submitting.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleNettoChange = this.handleNettoChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  public submitting (){
    return fetch('http://localhost:8000/facture', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
          'Content-Type': 'application/json',
      }  
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res !== 200){
        return console.log("dddd")
      }
    })
    .catch(error => console.log("Błąd: ", error));
    

  }

  public handleNameChange = (e:any) => {
    this.setState({
      name: e.target.value
    });
  }
  public handleTitleChange = (e:any) => {
    this.setState({
      title: e.target.value
    });
  }
  public handleLastNameChange = (e:any) => {
    this.setState({
      surName: e.target.value
    });
  }
  public handleNettoChange = (e:any) => {
    this.setState({
      netto: e.target.value
    });
  }
  public handleChange = (date:any) => {
    this.setState({
      date: date
    });
  };


  render(){
    const { handleSubmit, submitting } = this.props;
   
    return (
        <form onSubmit={handleSubmit} className="form-group col-6 container">
          <h1>Utwórz fakture</h1>
          <div>
            <div>Tytuł</div>
              <input required placeholder={'podaj tytuł'} value={this.state.title} onChange={this.handleTitleChange}></input>
            <div>Imię</div>
              <input required placeholder={'podaj imie'} value={this.state.name} onChange={this.handleNameChange}></input>
            <div>nazwisko</div>
              <input required placeholder={'podaj nazwisko'} value={this.state.surName} onChange={this.handleLastNameChange} ></input>
            <div>Kwota netto</div>
              <input required placeholder={'podaj kwota netto'} value={this.state.netto}  onChange={this.handleNettoChange}></input>
            <div className="form-group">
              <label>Select Date: </label>
                <DatePicker
                  required
                  selected={this.state.date}
                  onChange={this.handleChange}
                  name="startDate"
                  dateFormat= 'dd-MM-yyyy'
                />
            </div>
            <div className="form-group">
            <button color="info" className="col-lg-2 offset-xs-1" type="submit" id={"buttonSend"} disabled={submitting} onClick={this.submitting}>Send</button>
            </div>
          </div>
        </form>
    )
  }
}

export default Factur