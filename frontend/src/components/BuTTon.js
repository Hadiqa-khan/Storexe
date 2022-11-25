import React from 'react';
import './style.css';

export default function BuTTon() {
    
        return (
            <div className='main'>
                <h2>Share Files</h2>
                
                <label id="ForPub">Wallet Address</label>
                <input type="text" placeholder='Account Address'/>
                <form>
                <label id="ForPub">Browse File</label>
                <input type="file" id="myFile" name="filename"/> 
                </form>
                <button className='btn' type="submit">Send By Account</button>
            </div>
            );

}