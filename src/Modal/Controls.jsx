import "./Controls.css"
import Button from './../Button'

export default function Controls(props){
        return (
            <div style={{
                display:'flex',
                alignSelf:'flex-end',
                justifyContent:'space-around',
                // backgroundColor:'yellow',
                width:'100%',
                height:'10%',

            }}>
                <Button
                    content={0x2600}
                    title={'Light Mode'}
                    clickFunc={props.toggleDarkAndLightMode}
                />
                <Button
                    content={0x263E}
                    title={'Dark Mode'}
                    clickFunc={props.toggleDarkAndLightMode}
                />
            </div>
        );
    }
