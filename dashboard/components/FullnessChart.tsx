import {Component} from "react";
import {Reading} from "@/lib/interfaces";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export class FullnessChart extends Component<{ data: Reading[] }> {
    render() {
        return <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={this.props.data}
                margin={{top: 5, right: 20, left: 10, bottom: 5}}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="timestamp"/>
                <YAxis yAxisId="right" orientation="right" unit={"%"}/>
                <Tooltip/>
                <Line
                    type="monotone"
                    dataKey="fullness_level"
                    stroke="#8884d8"
                    strokeWidth={2}
                    yAxisId="right"
                />
            </LineChart>
        </ResponsiveContainer>;
    }
}