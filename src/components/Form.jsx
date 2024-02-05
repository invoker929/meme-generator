import { useEffect, useReducer, useRef } from "react";

export default function Form() {

    const [state, dispatch] = useReducer((state, action) => ({
        ...state,
        ...action
    }), {
        top: "",
        bottom: "",
        randomImage: "",
        hasMemes: false,
        isLoading: false,
        allMemes: []
    });
    const firstRender = useRef(true);
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("Use Effect!");
        async function callingApi() {
            console.log("Calling Api!");
            try {
                const response = await fetch("https://api.imgflip.com/get_memes");
                const data = await response.json();
                setTimeout(() => {
                    let allMemes = data.data.memes;
                    dispatch({ randomImage: getUrl(allMemes), allMemes, isLoading: false });
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }

        firstRender.current ? (firstRender.current = false) : callingApi();
    }, [state.hasMemes]);


    function getUrl(allMemes) {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        return allMemes[randomNumber].url;
    }

    function handleSubmit(event) {
        event.preventDefault();
        inputRef.current.focus();
        state.hasMemes ?
            dispatch({ randomImage: getUrl(state.allMemes), top: "", bottom: "" }) :
            dispatch({ hasMemes: true, isLoading: true });
    }

    console.log(state);


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input
                    ref={inputRef}
                    type="text"
                    className="top-text"
                    placeholder="Top Text"
                    value={state.top}
                    onChange={(e) => dispatch({ top: e.target.value })}
                />
                <input
                    type="text"
                    className="bottom-text"
                    placeholder="Bottom Text"
                    value={state.bottom}
                    onChange={(e) => dispatch({ bottom: e.target.value })}
                />
                <button disabled={state.isLoading} className="get-img-btn">
                    Get a new meme image 🖼
                </button>
            </form>
            {
                state.hasMemes &&
                    state.isLoading ? (
                    <div className="loader"></div>
                ) : (
                    state.randomImage &&
                    <div className="form-display">
                        <img src={state.randomImage} alt="" />
                        <h2 className="top-text">{state.top}</h2>
                        <h2 className="bottom-text">{state.bottom}</h2>
                    </div>
                )
            }
        </div>
    );
}