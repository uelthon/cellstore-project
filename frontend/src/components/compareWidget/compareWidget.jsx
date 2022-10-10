import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CompareButton from '../compareButton';
import './compareWidget.css'

const ViewCompare = ({item}) => (
   <div style={{display:'flex', flexDirection:'column',alignItems:'center',gap:'0.375rem'}}>
        <img width='65px' height='65px' style={{objectFit:'contain'}} src={item.img} />
        <CompareButton item={item} />
   </div>
)

function CompareWidget() {
  const [showA, setShowA] = useState(false);
  const compare = useSelector((state) => state.compare.value)

  const toggleShowA = () => setShowA(!showA);
  

  return (
    <div className='conteiner-widget'>
      <div className={`compare-widget-items ${showA ? 'show-compare-items' : ''}`}>
        <div style={{textAlign:'center',borderBottom:'1px solid rgba(0, 0, 0, 0.2)'}}>Compare</div>
        {compare.length < 1 ? 'Add products to Compare' : null}
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        {compare.map(e => <ViewCompare key={e.id} item={e} />)}
        </div>
        {compare.length > 0 ? <Link to='/compare' style={{textAlign:'center'}} >Compare</Link> : null }
      </div>
      <div className='btn-compare' onClick={toggleShowA}>
        Compare
      </div>
    </div>
  );
}

export default CompareWidget;