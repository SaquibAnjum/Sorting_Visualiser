import { useContext, useEffect } from "react";

import { SortingContext } from "../contexts/SortingContext";
import algorithmInfos from "../data/algorithmInfos";

function SortingChart() {
    const { sortingState, generateSortingArray, startVisualizing, changeSortingSpeed, changeAlgorithm } = useContext(SortingContext);

    useEffect(() => {
        generateSortingArray();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/logo.png" className="max-w-lg mx-auto mb-6 w-full drop-shadow-2xl" alt="Sorting Visualizer" />
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                        Sorting Visualizer
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Explore and visualize different sorting algorithms with interactive animations
                    </p>
                </div>
                
                {/* Algorithm Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        onClick={() => changeAlgorithm("bubble_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "bubble_sort" ? "active" : ""
                        }`}
                    >
                        Bubble Sort
                    </button>
                    <button
                        onClick={() => changeAlgorithm("insertion_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "insertion_sort" ? "active" : ""
                        }`}
                    >
                        Insertion Sort
                    </button>
                    <button
                        onClick={() => changeAlgorithm("selection_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "selection_sort" ? "active" : ""
                        }`}
                    >
                        Selection Sort
                    </button>
                    <button
                        onClick={() => changeAlgorithm("merge_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "merge_sort" ? "active" : ""
                        }`}
                    >
                        Merge Sort
                    </button>
                    <button
                        onClick={() => changeAlgorithm("quick_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "quick_sort" ? "active" : ""
                        }`}
                    >
                        Quick Sort
                    </button>
                    <button
                        onClick={() => changeAlgorithm("radix_sort")}
                        className={`algorithm-btn ${
                            sortingState.algorithm === "radix_sort" ? "active" : ""
                        }`}
                    >
                        Radix Sort
                    </button>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* Visualization Area */}
                    <div className="mb-8">
                        <div className="chart-container">
                            <div className="base"></div>
                            {sortingState.array.map((bar, i) => (
                                <div key={i} className="bar-container">
                                    <div className={`select-none bar bar-${bar.state}`} style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}>
                                        <p className={`pl-1.5 text-sm font-semibold ${bar.state === "idle" ? "text-cyan-300" : "text-red-300"}`}>{bar.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 max-w-4xl mx-auto mb-8">
                        <button 
                            disabled={sortingState.sorting} 
                            onClick={startVisualizing} 
                            className="push-btn px-8 py-3"
                        >
                            {sortingState.sorting ? "Sorting..." : "Sort"}
                        </button>
                        <button 
                            disabled={sortingState.sorting} 
                            onClick={() => generateSortingArray()} 
                            className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-semibold hover:from-slate-500 hover:to-slate-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            New Array
                        </button>
                        <select
                            disabled={sortingState.sorting}
                            onChange={changeSortingSpeed}
                            defaultValue="slow"
                            className="speed-btn px-4 py-3"
                        >
                            <option value="slow">Slow</option>
                            <option value="normal">Normal</option>
                            <option value="fast">Fast</option>
                        </select>
                    </div>

                    {/* Success Message */}
                    {sortingState.sorted && (
                        <div className="success-message mb-8">
                            ✓ Array has been sorted successfully!
                        </div>
                    )}

                    {/* Algorithm Information */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">
                            {algorithmInfos[sortingState.algorithm].name}
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                            {algorithmInfos[sortingState.algorithm].description}
                        </p>
                        
                        {/* Complexity Table */}
                        <div className="complexity-table rounded-xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 border-r border-slate-600" rowSpan={2}>
                                            Algorithm
                                        </th>
                                        <th className="px-6 py-4 border-r border-slate-600" colSpan={3}>
                                            Time Complexity
                                        </th>
                                        <th className="px-6 py-4">Space Complexity</th>
                                    </tr>
                                    <tr className="border-b border-slate-600">
                                        <th className="px-6 py-3 text-sm">Best</th>
                                        <th className="px-6 py-3 text-sm">Average</th>
                                        <th className="px-6 py-3 text-sm border-r border-slate-600">Worst</th>
                                        <th className="px-6 py-3 text-sm">Worst</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(algorithmInfos).map((key, i) => (
                                        <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                                            <td className={`px-6 py-4 border-r border-slate-600 font-medium ${i === 0 ? "pt-6" : ""}`}>
                                                {algorithmInfos[key].name}
                                            </td>
                                            <td className={`px-6 py-4 ${i === 0 ? "pt-6" : ""}`}>
                                                <span className={`px-3 py-1 rounded-lg bg-${algorithmInfos[key].time_complexity.best[1]} text-white text-sm font-semibold`}>
                                                    {algorithmInfos[key].time_complexity.best[0]}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 ${i === 0 ? "pt-6" : ""}`}>
                                                <span className={`px-3 py-1 rounded-lg bg-${algorithmInfos[key].time_complexity.average[1]} text-white text-sm font-semibold`}>
                                                    {algorithmInfos[key].time_complexity.average[0]}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 border-r border-slate-600 ${i === 0 ? "pt-6" : ""}`}>
                                                <span className={`px-3 py-1 rounded-lg bg-${algorithmInfos[key].time_complexity.worst[1]} text-white text-sm font-semibold`}>
                                                    {algorithmInfos[key].time_complexity.worst[0]}
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 ${i === 0 ? "pt-6" : ""}`}>
                                                <span className={`px-3 py-1 rounded-lg bg-${algorithmInfos[key].space_complexity[1]} text-white text-sm font-semibold`}>
                                                    {algorithmInfos[key].space_complexity[0]}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortingChart;
