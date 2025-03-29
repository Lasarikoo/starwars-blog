import "../css/LeftBar.css";


function LeftBar() {

    return (
        <div className="leftbar">
            <button type='button' className='leftbutton'>
                Characters
            </button>
            <button type='button' className='leftbutton'>
                Movies
            </button>
            <button type='button' className='leftbutton'>
                Starships
            </button>
            <button type='button' className='leftbutton'>
                Vehicles
            </button>
            <button type='button' className='leftbutton'>
                Species
            </button>
            <button type='button' className='leftbutton'>
                Planets
            </button>
        </div>
    )

}

export default LeftBar;