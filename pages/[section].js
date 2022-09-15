import { Fragment, useCallback, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    Bars3BottomLeftIcon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon, BoltIcon } from '@heroicons/react/20/solid'
import { categories, data } from '../data';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Container from '../components/container';
import Question from '../components/question';
import { classNames } from '../utilities';
import { shuffle } from 'lodash';


const btnClassNames = "border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";


export default function Section() {
    const router = useRouter();
    const section = router.query.section;
    const [showMajorOnly, setShowMajorOnly] = useState(false);
    const [viewMode, setViewMode] = useState('STUDY');
    const [category, setCategory] = useState();
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [currentAnswers, setCurrentAnswers] = useState({});

    const init = useCallback((_category, randomize = true) => {
        const _questions = data
            .filter(i => i.seriesId === _category.seriesId)
            .filter(i => {
                if (showMajorOnly) {
                    return i.isMajorFault;
                }
                return true;
            });
        const list = randomize ? shuffle(_questions) : _questions;
        setQuestions(list);
        setSelectedQuestion(list[0]);
        // Get user data
        setCurrentAnswers({});
    }, [showMajorOnly]);

    useEffect(() => {
        if (section) {
            const _category = categories.find(i => i.slug === section)
            setCategory(_category);
        }
    }, [section]);


    useEffect(() => {
        if (category) {
            init(category);
        }
    }, [showMajorOnly, category, init]);

    const onSubmit = (answer, question) => {
        setCurrentAnswers((prev) => ({ ...prev, [question.id]: answer }));
        const nextIndex = questions.indexOf(question) + 1;
        const _selectedQuestion = questions[nextIndex];
        if (_selectedQuestion) {
            setSelectedQuestion(_selectedQuestion);
        }
    }

    return (
        <Container header={category?.title}>
            <div className="flex justify-center gap-4 py-4">
                <span className="inline-flex rounded-md shadow-sm isolate">
                    <button
                        type="button"
                        onClick={() => setShowMajorOnly(!showMajorOnly)}
                        className={classNames(...[
                            "relative inline-flex items-center rounded-l-md",
                            btnClassNames,
                            showMajorOnly ? "font-bold bg-slate-300" : " hover:text-gray-700"
                        ])}
                    >
                        Major only
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('STUDY')}
                        className={classNames(...[
                            "relative -ml-px inline-flex items-center",
                            btnClassNames,
                            viewMode === 'STUDY' ? "font-bold bg-slate-300" : " hover:text-gray-700"
                        ])}
                    >
                        Study
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('LIST')}
                        className={classNames(...[
                            "relative -ml-px inline-flex items-center",
                            btnClassNames,
                            viewMode === 'LIST' ? "font-bold bg-slate-300" : " hover:text-gray-700"
                        ])}
                    >
                        List
                    </button>
                    <button
                        type="button"
                        onClick={() => setViewMode('SINGLE')}
                        className={classNames(...[
                            "relative -ml-px inline-flex items-center rounded-r-md",
                            btnClassNames,
                            viewMode === 'SINGLE' ? "font-bold bg-slate-300" : " hover:text-gray-700"
                        ])}
                    >
                        Single
                    </button>
                </span>
            </div>
            <div className="grid gap-4">
                {['LIST', 'STUDY'].includes(viewMode) && questions.map((q, index) => <Question
                    key={q.id}
                    question={q}
                    isActive={true}
                    onCommit={(answer) => onSubmit(answer, q)}
                    currentAnswer={currentAnswers[q.id]}
                    progress={`${questions.indexOf(q) + 1} / ${questions.length}`}
                    viewMode={viewMode}
                />)}
                {viewMode === 'SINGLE' && <Question
                    question={selectedQuestion}
                    isActive={true}
                    onCommit={(answer) => onSubmit(answer, selectedQuestion)}
                    currentAnswer={currentAnswers[selectedQuestion?.id]}
                    progress={`${questions.indexOf(selectedQuestion) + 1} / ${questions.length}`}
                    viewMode={viewMode}
                />}
            </div>
        </Container>
    )
}
