import React, { useEffect, useState } from 'react'
import QuoteIcon from './quote_icon.png';
import QuoteRotateIcon from './quote_rotate.png';


const  Quotes = ()=> {

    const [quotesDetails, setQuoteDetails] = useState([])
    const [quotes, setQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchQuotes = async()=>{
            setLoading(true);
            try{
                const response = await fetch('https://type.fit/api/quotes');
                const data = await response.json();

                console.log(data)
                setQuoteDetails(data)
                setQuotes(data)
                setLoading(false)

            }catch(err){
                console.error(`Got this error while fetching quotes ${err}`)
                setLoading(false)
            }
        }

        fetchQuotes();

    }, [])



    const handleChange = (eve)=>{
        const temp = quotesDetails.filter(item=>item.text.toLowerCase().includes(eve.target.value.toLowerCase()))
        setQuotes(temp)
        setSearchTerm(eve.target.value)
    }

   
    
    if(loading){
        return<div className="loader">Loading...</div>
    }


    return (
        <>
        <div className='container'>
            <input 
            type="text" 
            className='inp' 
            placeholder='Search...'
            value={ searchTerm }
            onChange = { handleChange }
            />
        </div>
        {
            quotes?.length > 0 
            ?
            quotes.map((item, index)=>(
            <article className='article' key={index}>
                <img src={QuoteIcon} alt="#" className='left' />
                <p className='quote'>
                    {   item.text   }
                </p>
                <img src={QuoteRotateIcon} alt="#" className='right'/>
                <div>
                    <p className='auth'>{ item.author }</p>
                    <div className='line'></div>
                </div>
            </article>
            ))
            :
            <article className='article'>
                <p>Found Nothing..!</p>
            </article>


        }
        </>
    )
}

export default Quotes