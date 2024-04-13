import { useState } from 'react'
import { Dialog } from '@headlessui/react'

export default function MyDialog() {
    let [isOpen, setIsOpen] = useState(true)

    function handleDeactivate() {
        // ...
    }

    return (
        /*
          Pass `isOpen` to the `open` prop, and use `onClose` to set
          the state back to `false` when the user clicks outside of
          the dialog or presses the escape key.
        */
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-white text-black">
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    <Dialog.Description>
                        This will permanently deactivate your account
                    </Dialog.Description>

                    <p>
                        Are you sure you want to deactivate your account? All of your data
                        will be permanently removed. This action cannot be undone.
                    </p>

                    {/*
          You can render additional buttons to dismiss your dialog by setting
          `isOpen` to `false`.
        */}
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                    <button onClick={handleDeactivate}>Deactivate</button>
                </Dialog.Panel>
            </div>
        </Dialog>
)
}