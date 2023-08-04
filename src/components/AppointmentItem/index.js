// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {AppointmentDetails} = props
  const {title, date, id, isStarred} = AppointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onStarClick = () => {
    const {onClickStar} = props
    onClickStar(id)
  }

  const activeImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-appointment">
      <div className="title-star-container">
        <p className="each-heading">{title}</p>
        <button
          type="button"
          className="each-star-button"
          onClick={onStarClick}
          data-testid="star"
        >
          <img src={activeImage} alt="star" />
        </button>
      </div>
      <p className="each-date">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
