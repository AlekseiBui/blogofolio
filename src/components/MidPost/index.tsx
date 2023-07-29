import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import './styles.module.scss'
import Like from './../../assets/Like.png'
import Dislike from './../../assets/Dislike.png'
import Bookmark from './../../assets/Bookmark.png'
import Dots from './../../assets/Dots.png'
import { Link } from 'react-router-dom'
import WhiteLike from './../../assets/WhiteLike.png'
import WhiteDislike from './../../assets/WhiteDislike.png'
import WhiteBookmark from './../../assets/WhiteBookmark.png'
import WhiteDots from './../../assets/WhiteDots.png'
import { ThemeContext } from '../../hoc/ThemeProvider'
import { Options } from '../../Types/Types'

type Props = {
    id: number;
    image?: string;
    date: string;
    title: string;
}

const MidPost = (props: Props) => {

    const { theme } = useContext(ThemeContext)

    const [optionsState, SetOpttionsState] = useState<Options>({
        like: Like,
        dislike: Dislike,
        bookmark: Bookmark,
        dots: Dots
    })

    useEffect(() => {
        if (theme.theme === 'light') {
            SetOpttionsState({
                like: Like,
                dislike: Dislike,
                bookmark: Bookmark,
                dots: Dots
            }
            )

        } else if (theme.theme === 'dark') {
            SetOpttionsState({
                like: WhiteLike,
                dislike: WhiteDislike,
                bookmark: WhiteBookmark,
                dots: WhiteDots
            })
        }
    }, [theme.theme])

    return (
        <div className={`${styles.MidPost}`}>
            <img src={`${props.image}`} />

            <div>{props.date}</div>

            <div><Link to={'/SelectedPost/' + props.id}>{props.title}</Link></div>

            <div className={`${styles.MidPost_BottomPart}`}>
                <div className={`${styles.LikeDislike}`}>
                    <img src={`${optionsState.like}`} />
                    <div>10</div>
                    <img src={`${optionsState.dislike}`} />
                    <div>10</div>
                </div>
                <div className={`${styles.FavOptions}`}>
                    <img src={`${optionsState.bookmark}`} />
                    <img src={`${optionsState.dots}`} />
                </div>
            </div>

        </div >
    )
}

export default MidPost