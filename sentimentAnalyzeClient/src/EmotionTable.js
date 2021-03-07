import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {


    render() {
        if (this.props.emotions === 'err') {
           return (
               <div style={{color:"red",fontSize:20}}>An error occurred! Please change the text and try again!</div>
           );
        }
        let emotion = [];
        for(let key in this.props.emotions){
            emotion.push({'key':key , 'value': this.props.emotions[key]});
        }
        return (
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                emotion.map(function(emotion_local, index){
                    return (
                        <tr><td>{emotion_local.key}</td><td>{emotion_local.value}</td></tr>
                    )
                })
            }
            </tbody>
          </table>
          </div>
          );
        }
}
export default EmotionTable;