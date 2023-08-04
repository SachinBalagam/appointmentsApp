// Write your code here
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], starredFilter: false}

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuid(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onStarredClick = () => {
    this.setState(prevState => ({starredFilter: !prevState.starredFilter}))
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, starredFilter} = this.state

    if (starredFilter) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {title, date, starredFilter} = this.state
    const filterClassName = starredFilter ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="form-image-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Add Appointment</h1>
              <label htmlFor="input-text" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="input-text"
                placeholder="Title"
                className="input"
                onChange={this.onTitleChange}
                value={title}
              />
              <label htmlFor="input-date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="input-date"
                className="input"
                onChange={this.onDateChange}
                value={date}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="app-image"
            />
          </div>
          <hr className="line" />
          <div className="heading-button-container">
            <h1 className="heading">Appointments</h1>
            <button
              type="button"
              className={`starred-button ${filterClassName}`}
              onClick={this.onStarredClick}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                AppointmentDetails={eachAppointment}
                onClickStar={this.onClickStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
