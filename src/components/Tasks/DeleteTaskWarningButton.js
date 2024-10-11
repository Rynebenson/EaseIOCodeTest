/**
 * @param {React.ComponentProps} props
 * @param {Boolean} props.disabled
 * @param {String} props.title
 * @param {String} props.styles
 * @returns {React.Component}
 */
export default function DeleteTaskWarningButton(props) {
  return (
    <button 
      disabled={props.disabled}
      onClick={props.handleClick}
      className={`text-slate-600 bg-slate-100 mb-3 font-medium rounded-lg h-10 disabled:bg-slate-50 disabled:text-slate-400`}
    >
      {props.title}
    </button>
  )
}