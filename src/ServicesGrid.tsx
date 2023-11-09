import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import axios from 'axios';
import _ from 'lodash';


export const ServicesGrid: FC<{}> = props => {

    //#region --Constants--


    //#endregion

    //#region --States--
    const [data, setData] = useState<any[]>([]);
    const [counter, setCounter] = useState<number>(0);
    const gridComponentRef = useRef<GridComponent>(null)
    const [divHeight, setDivHeight] = useState<string>("");
    const [showGrid, setShowGrid] = useState<boolean>(() => {
        let item = localStorage.getItem('showGrid');
        if (item) {
            let parsed = JSON.parse(item)
            if (!parsed) {
                return false;
            }
            else {
                return parsed as boolean;
            }
        }
        else {
            return false;
        }
    });
    const [row1Height, setRow1Height] = useState<number>(0)
    const [row2Height, setRow2Height] = useState<number>(0)
    const [row3Height, setRow3Height] = useState<number>(0)
    const [proposedProperHeight, setProposedProperHeight] = useState<number>(200)

    //#endregion

    //#region --Hooks--

    useEffect(() => {
        const gridContainer: HTMLDivElement = document.getElementById('GridComponentsDIVParent') as HTMLDivElement;
        const divRow1: HTMLDivElement = document.getElementById('GridComponentsDIVPart1') as HTMLDivElement;
        const divRow2: HTMLDivElement = document.getElementById('GridComponentsDIVPart2') as HTMLDivElement;
        const divRow3: HTMLDivElement = document.getElementById('GridComponentsDIVPart3') as HTMLDivElement;
        const grid: any = gridContainer?.querySelector('.e-grid');

        const resizeGrid = () => {
            setRow1Height(divRow1.clientHeight)
            setRow2Height(divRow2.clientHeight)
            setRow3Height(divRow3.clientHeight)
            setProposedProperHeight(divRow2.clientHeight - 50)            
            setDivHeight( gridContainer.clientHeight.toString())
        };

        resizeGrid() // Set initial size
        window.addEventListener('resize', resizeGrid)

        return () => {
            window.removeEventListener('resize', resizeGrid)
        };

    }, []);

    //#endregion

    //#region --Functions--

    const fetchData = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const fetchJustSomeData = (size: number) => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                // take just last 5
                const lastComments: any[] = _.takeRight(response.data, size)
                setData(lastComments);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    //#endregion

    //#region --Render--

    const returnMainJSX = () => {
        return (
            <div id="GridComponentsDIVParent" className='gridContainer' >
                <div className='gridContainerRow1' id='GridComponentsDIVPart1' >
                    <button onClick={fetchData}>fetch data</button>
                    <button onClick={e => setData([])}>empty data</button>
                    <button onClick={e => fetchJustSomeData(5)}>Just 5 data</button>
                    <button onClick={e => fetchJustSomeData(8)}>Just 8 data</button>
                    <button onClick={e => fetchJustSomeData(13)}>Just 13 data</button>
                    <button onClick={e => fetchJustSomeData(20)}>Just 20 data</button>
                    <label><input
                        type="checkbox"
                        checked={showGrid}
                        onChange={u => {
                            setShowGrid(c => {
                                localStorage.setItem('showGrid', JSON.stringify(!c))
                                return !c;
                            })

                        }}
                    />Show Grid</label>
                    <label style={{ marginLeft: '100px' }}>{` current number of data : ${data.length}  ||  ${divHeight} = ${row1Height} + ${row2Height} + ${row3Height} `}</label>
                </div>
                <div className='gridContainerRow2' id='GridComponentsDIVPart2' >
                    {showGrid ?
                        (<GridComponent dataSource={data} 
                            ref={gridComponentRef}
                            height={proposedProperHeight} 
                            enableHover={false}
                        >
                            <ColumnsDirective>
                                <ColumnDirective field='id' headerText='ID' width='100' />
                                <ColumnDirective field='postId' headerText='Post ID' width='100' />
                                <ColumnDirective field='name' headerText='Name' width='200' />
                                <ColumnDirective field='email' headerText='Email' width='250' />
                                <ColumnDirective field='body' headerText='Content body' width='350' />
                            </ColumnsDirective>
                        </GridComponent >)
                        :
                        (<></>)
                    }

                </div >
                <div className='gridContainerRow3' id='GridComponentsDIVPart3' >
                    <label>{`The size of data is ${data.length} `}</label>

                    {showGrid && gridComponentRef.current ? 
                    (<label>{`  ... and the height of SF Grid is ${gridComponentRef.current.height} `}</label>) 
                    : 
                    (<></>)  }
                </div>
            </div >)
    }

    return returnMainJSX();

    //#endregion
};