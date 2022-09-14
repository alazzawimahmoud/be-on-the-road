/* eslint-disable @next/next/no-img-element */

export default function Question({ question, isActive, onCommit, progress }) {
    const [answer, setAnswer] = useState();
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

    return <div className={classNames(...[
        "rounded h-min border-b border-gray-200 bg-white px-4 py-5 sm:px-6 relative",
        !isActive ? "opacity-50" : ""
    ])}>
        <div className="h-full grid md:grid-cols-5 gap-4">
            <div className="grid items-center content-center justify-center md:col-span-2">
                <img
                    onDoubleClick={() => setShowExplanation(!showExplanation)}
                    src={question?.image}
                    alt={question?.question}
                    className="object-center"
                />
            </div>
            <div className="grid gap-4 md:col-span-3">
                <h3 className="text-lg font-medium leading-6 text-gray-900" dangerouslySetInnerHTML={{ __html: question?.question }} ></h3>
                <Choices choices={question?.choices || []} onChange={onChange} value={answer} />
                <div className="flex items-center justify-end">
                    <div className="px-6">{progress}</div>
                    <button
                        onClick={onSubmit}
                        type="button"
                        className="relative w-12 h-w-12 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
        {showExplanation && <div className="text-md leading-6 text-gray-900" dangerouslySetInnerHTML={{ __html: question?.explanation }} ></div>}
        {question?.isMajorFault && <BoltIcon className="absolute top-4 left-4 w-5 h-5 text-red-500" />}
    </div>
}


import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { classNames } from '../utilities';
import { BoltIcon } from '@heroicons/react/20/solid';

function Choices({ choices, onChange, value }) {
    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-md">
                <div className="space-y-2">
                    {choices.map((choice, index) => (
                        <div
                            key={choice}
                            onClick={() => onChange(index)}
                            className={`${value === index ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'} relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <div className="text-sm">
                                        <p
                                            className={`font-medium  ${value === index ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            {choice}
                                        </p>

                                    </div>
                                </div>
                                {value === index && (
                                    <div className="shrink-0 text-white">
                                        <CheckIcon className="h-6 w-6" />
                                    </div>
                                )}
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
