import { TbX } from "react-icons/tb"

/**
 * Reusable modal shell for all modal components
 * 
 * @param {React.ComponentProps} props 
 * @param {String} props.dataTestId
 * @param {String} props.title
 * @param {Boolean} props.visible
 * @param {Function} props.onClose
 * @param {React.ReactNode} props.children
 * @returns {React.Component}
 */
export default function Wrapper(props) {
  return (
    <div 
      data-testid={props.dataTestId}
      className={`fixed ${props.visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} overflow-auto top-0 left-0 h-full w-full bg-slate-500/50 z-40`}
    >
      <div className={`flex flex-col ${props.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"} transition-all duration-300 origin-top h-auto bg-white p-6 m-auto sm:rounded-xl sm:my-20 w-full max-w-lg shadow-md md:w-50`}>
      
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-medium text-xl">{props.title}</h2>

          <button
            data-testid={props.closeButtonDataTestId}
            className="flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-all text-xl h-8 w-8 ml-auto"
            onClick={props.handleClose}
          >
            <TbX />
          </button>
        </div>

        {props.children}
      </div>
    </div>
  )
}