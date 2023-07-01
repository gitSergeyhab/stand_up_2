import { useRef, useState, FormEventHandler } from 'react';
import { ChatButton, ChatInputForm, ChatTextarea, ErrorMessage } from './chat-input-style';




export function ChatInput() {

  const [err, setErr] = useState('')
  const [focus, setFocus] = useState(false);
  const textRef = useRef<null|HTMLTextAreaElement>(null);

  const handleFocus = () => setFocus(true)
  const handleBlur = () => setFocus(false)

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    const value = textRef.current?.value?.trim();
    if (!value || value?.length < 3) {
      setErr('перед отправкой сообщения его придется написать. Миниму 3 символа')
      return;
    }
    setErr('')

    console.log(value)
  }

  const errorBlock = err ? <ErrorMessage>{err}</ErrorMessage> : null
  return (
    <>
      {errorBlock}
      <ChatInputForm onSubmit={handleSubmit} focus={focus}>

        <ChatTextarea ref={textRef} onFocus={handleFocus} onBlur={handleBlur} required />
        <ChatButton>➤</ChatButton>
      </ChatInputForm>
    </>


  )

}
