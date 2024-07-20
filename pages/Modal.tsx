import { forwardRef, MouseEventHandler } from "react"
interface Props{
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}
export type Ref = HTMLDialogElement;
export default forwardRef<Ref, Props>(function Modal({title,children, onClose} , ref){ 
    return(
        <dialog ref={ref}>
            <div>
                <h1>{title}</h1>
                
            </div>
            <div >{children}</div>
            {/* <button type="button" onClick={onClose} >&times;</button> */}
        </dialog>
    )
});