
import { useState, useEffect } from "react";

const Search = () => {

    const [keyword, setKeyword] = useState('');
    const [color, setColor] = useState('');
    const [orientation, setOrientation] = useState('')
    const [photos, setPhotos] = useState([])
    const [loadMore, setLoadMore] = useState(false);
    const [page, setPage] = useState();
    const [totalPages, setTotalPages] = useState(1);


    const access_key = 'x0xSg1JYYEt9TbqnrqbX5qTXtNckqRYZ-t7smHQ2TtY';


    const getPhotos = async () => {

        try {
            let response;
            //checks if the user has selected the color or the orientation apart from the keyword
            if (color !== '' && orientation !== '') {
                response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&color=${color}&orientation=${orientation}&client_id=${access_key}`);
            } else if (color !== '' && orientation === '') {
                response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&color=${color}&client_id=${access_key}`);
            } else if (color === '' && orientation !== '') {
                response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&orientation=${orientation}&client_id=${access_key}`);
            }
            else {
                response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${access_key}`);
            }

            const data = await response.json();
            setPage(1);
            setPhotos(data.results);
            console.log(data);
            //display the load more button or not
            if (data.total_pages > 1) { setLoadMore(true) } else { setLoadMore(false) }
            setTotalPages(data.total_pages)
            console.log(totalPages)
        } catch (error) {
            console.error(`Download error: ${error.message}`);
            setLoadMore(false);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();


        getPhotos();
    };






    const getMorePhotos = async () => {
        try {
            const nextPage = page + 1;
            if (nextPage <= totalPages) {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&page=${nextPage}&client_id=${access_key}`);
                const data = await response.json();
                setPhotos([...photos, ...data.results]);
                setPage(nextPage);
                if (nextPage < totalPages) { setLoadMore(true) } else { setLoadMore(false) }
            }
        } catch (error) {
            console.error(`Download error: ${error.message}`);
        }
    };



    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-gray-700 mt-8 font-extrabold text-xl">Search for an image</h2>
            <form className="border-2 w-80 h-96 mt-9" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="keyword">Input a keyword:</label>
                    <input
                        id="keyword"
                        type="text"
                        required
                        className="border-2 ml-3"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <label htmlFor="color">Select a color: (optional)</label>
                    <select value={color} onChange={(event) => setColor(event.target.value)}>
                        <option value="">Choose a color</option>
                        <option value="black_and_white">Black and White</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                        <option value="purple">Purple</option>
                        <option value="magenta">Magenta</option>
                        <option value="green">Green</option>
                        <option value="teal">Teal</option>
                        <option value="blue">Blue</option>
                    </select>
                </div>

                <div className="flex flex-col items-center justify-center mt-4">
                    <label htmlFor="orientation">Select an orientation: (optional)</label>
                    <select value={orientation} onChange={(event) => setOrientation(event.target.value)}>
                        <option value="">Choose orientation</option>
                        <option value="landscape">Landscape</option>
                        <option value="portrait">Portrait</option>
                        <option value="squarish">Squarish</option>
                    </select>
                </div>

                <div className="flex flex-col items-center justify-center mt-5">
                    <button type="submit" className="border-2 bg-blue-600 w-56 h-20 text-white">Submit</button>
                </div>
            </form>






            <div className="flex flex-wrap justify-center mt-8 items-center">
                {photos.length > 0 ? (
                    photos.map((photo, index) => (
                        <img key={index} src={photo.urls.thumb} alt={photo.alt_description} className="m-2" style={{ width: "auto", height: "auto" }} />
                    ))
                ) : (
                    <p className="mt-4 text-center lg:text-xl font-bold">No images found with these search criteria.</p>
                )}

                <div className="flex items-center justify-center">
                    {loadMore && <button onClick={getMorePhotos} className="border-2 rounded-md bg-blue-400 w-auto h-16">Load More...</button>}
                </div>
            </div>




        </div>
    );
};

export default Search;



