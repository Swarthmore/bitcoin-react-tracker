import {VictoryChart, VictoryAxis, VictoryLine} from 'victory';

export default function Chart(props) {
    return (
        <VictoryChart 
            width={640} 
            height={440}
        >
            <VictoryLine 
                data={props.data} 
                interpolation="natural"
                domain={{y: [58000, 68000]}}
            />

            <VictoryAxis 
                fixLabelOverlap={true} 
                tickFormat={(t) => new Date(t).toLocaleDateString()}     
                style={{
                    tickLabels: {fontSize: 10}
                }}
            />
            <VictoryAxis 
                dependentAxis 
                style={{
                    tickLabels: {fontSize: 10}
                }}
            />
        </VictoryChart>
    );
}
