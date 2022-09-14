import { useRouter } from 'next/router'
import Question from '../components/question'
import { camelCase, uniqBy } from 'lodash';
import Container from '../components/container';
import { useEffect, useState } from 'react';
import { categories, data } from '../data';

const Section = () => {

    const router = useRouter()
    const { type } = router.query
    const category = categories.find(i => i.slug === type)
    const [categoryData, setCategoryData] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState();

    useEffect(() => {
        if (category) {
            const _categoryData = data.filter(i => i.seriesId === category.seriesId);
            setCategoryData(_categoryData)
            setSelectedQuestion(_categoryData[0])
        }
    }, [category]);

    console.log('categoryData', categoryData)

    return <Container>
        <h2 className="text-2xl font-bold text-gray-900 p-5">{categoryData?.title}</h2>
        <Question question={selectedQuestion} />
    </Container>
}

export default Section