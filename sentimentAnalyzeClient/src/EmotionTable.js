import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
   render() {
    const colorStyle = { color:this.props.color,fontSize:this.props.size+"px"}
    let li_ctr = 0;
    return (
      <div style={colorStyle}>
        React Component
            <ul>
                {this.state.eventList.map(function(eventDetails){
                    return <li key={li_ctr++}>{eventDetails}</li>;
                  })}
            </ul>      
        </div>
    );
  }
    
}
export default EmotionTable;