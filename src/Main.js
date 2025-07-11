import React, { useState, useCallback, useEffect,useRef } from 'react'

function Main() {

    const [length, setlength] = useState(8)
    const [charAllow, setCharAllow] = useState(false)
    const [numberAllow, setnumberAllow] = useState(false)
    const [password, setpassword] = useState('')
    const copyRef = useRef(null)

    const genpassword = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if (numberAllow) str += "0123456789";
  if (charAllow) str += "~!@#%^&*()<>";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * str.length);
    pass += str.charAt(index);
  }

  setpassword(pass);
}, [length, charAllow, numberAllow]);


    useEffect(() => {
        genpassword()
    }, [length, charAllow, numberAllow])

    

    const copyPass=()=>{
        window.navigator.clipboard.writeText(password)
        alert("copied")
    }

    return (
        <div>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8    bg-gray-800 text-orange-500'>
                <h2 className='text-white text-center my-3'>Password Generator</h2>
                <div className='flex shadonw rounded-lg overflow-hidden mb-4'>
                    <input type="text" value={password} className='outline-none w-full py-1 px-3 ' placeholder='Password' readOnly></input>
                </div>
                <button onClick={genpassword} className="bg-blue-700 mx-3 text-white px-3 py-1 rounded">Generate</button>

                <button ref={copyRef} onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input type='range' min={6} max={100} value={length} name='' id='' onChange={(e) => setlength(e.target.value)}></input>
                        <label htmlFor='length'>length {length}</label>
                        <input type='checkbox'
                            onChange={() => {
                                setnumberAllow((prev) => !prev)
                            }}
                            defaultChecked={numberAllow}
                        />
                        <label htmlFor='number'>Number</label>

                        <input type='checkbox'
                            onChange={() => {
                                setCharAllow((prev) => !prev)
                            }}
                            defaultChecked={charAllow}
                        />
                        <label htmlFor='character'>Character</label>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Main

