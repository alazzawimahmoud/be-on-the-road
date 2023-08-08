/* eslint-disable @next/next/no-img-element */

export default function Question({ question, onCommit, progress, viewMode }) {
    const [answer, setAnswer] = useState();
    const [visualType, setVisualType] = useState('image');
    const [showExplanation, setShowExplanation] = useState(false);

    const onChange = (payload) => {
        setAnswer(payload)
    }

    const onSubmit = () => {
        onCommit(answer);
    }

    useEffect(() => {
        if (question) {
            setAnswer();
        }
    }, [question]);

    useEffect(() => {
        if (question?.image || question?.video) {
            setVisualType(question?.image ? 'image' : question?.video ? 'video' : null);
        } else {
            setVisualType(null);
        }
    }, [question]);

    useEffect(() => {
        if (question && (showExplanation || viewMode === VIEW_MODES.STUDY)) {
            setAnswer(question.answerType === 'INPUT' ? 0 : question.answer);
        } else {
            setAnswer()
        }
    }, [viewMode, showExplanation, question]);

    return <div className={classNames(...[
        "rounded h-min border-b border-gray-200 grid gap-4 bg-white px-4 py-5 sm:px-6 relative",
    ])}>
        <div
            className={classNames(...[
                "grid h-full gap-4",
                question?.image || question?.video ? 'md:grid-cols-5' : ''
            ])}
        >
            {/* TODO Add Support for video */}
            {visualType && <div className="grid items-center content-center justify-center md:col-span-2">
                <img
                    onDoubleClick={() => setShowExplanation(!showExplanation)}
                    src={question.image}
                    alt={question.question}
                    className="object-center"
                />
            </div>}
            <div
                className={classNames(...[
                    "grid gap-4",
                    question?.image || question?.video ? 'md:col-span-3' : ''
                ])}            >
                <h3 className="text-lg font-medium leading-6 text-gray-900" dangerouslySetInnerHTML={{ __html: question?.question }} ></h3>
                <Choices choices={question?.choices || []} onChange={onChange} value={answer} disabled={(showExplanation || viewMode === VIEW_MODES.STUDY)} />
                <div className="flex items-center justify-end">
                    <div className="px-6">{progress}</div>
                    {viewMode !== VIEW_MODES.STUDY && <button
                        onClick={onSubmit}
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>}
                </div>
            </div>
        </div>
        {(showExplanation || viewMode === VIEW_MODES.STUDY) && <div className="p-5 leading-6 text-gray-900 rounded bg-slate-300 text-md" dangerouslySetInnerHTML={{ __html: question?.explanation }} ></div>}
        {question?.isMajorFault && <BoltIcon className="absolute w-5 h-5 text-red-500 top-2 left-2" />}
    </div>
}


import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '../utilities';
import { BoltIcon } from '@heroicons/react/20/solid';
import { VIEW_MODES } from '../shared';

function Choices({ choices, onChange, value, disabled }) {
    return (
        <div className="w-full">
            <div className="w-full max-w-md mx-auto">
                <div className="space-y-2">
                    {choices.map((choice, index) => (
                        <div
                            key={index}
                            onClick={() => !disabled && onChange(index)}
                            className={classNames(...[
                                "relative flex  rounded-lg px-5 py-4 shadow-md focus:outline-none",
                                value === index ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white',
                                !disabled ? 'cursor-pointer' : 'cursor-default'
                            ])}
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="grid items-center content-center justify-center w-6 h-6">
                                    {choice.image && <img
                                        src={choice.image}
                                        alt={choice.text}
                                        className="object-center"
                                    />}
                                </div>

                                <div className="flex items-center">
                                    <div className="text-sm">
                                        {choice.text && <p
                                            className={`font-medium  ${value === index ? 'text-white' : 'text-gray-900'}`}
                                            dangerouslySetInnerHTML={{ __html: choice.text }}
                                        ></p>}

                                    </div>
                                </div>

                                <div className={`text-white shrink-0 ${value === index ? '' : 'opacity-0'}`}>
                                    <CheckIcon className="w-6 h-6" />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
