import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import './styles.module.scss'
import Like from './../../assets/Like.png'
import Dislike from './../../assets/Dislike.png'
import Bookmark from './../../assets/Bookmark.png'
import Dots from './../../assets/Dots.png'
import WhiteLike from './../../assets/WhiteLike.png'
import WhiteDislike from './../../assets/WhiteDislike.png'
import WhiteBookmark from './../../assets/WhiteBookmark.png'
import WhiteDots from './../../assets/WhiteDots.png'
import { ThemeContext } from '../../hoc/ThemeProvider'
import { Link } from 'react-router-dom'
import { Options, PostType } from '../../Types/Types'
import { setAsFavoriteAction } from '../../Store/FavPosts/Actions'
import { useDispatch } from 'react-redux'
import { likePostThunk } from '../../Store/Posts/Actions'
import { AppDispatch } from '../../Store'

type Props = {
    post: PostType
}

const BigPost = (props: Props) => {

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

    const dispatch = useDispatch<AppDispatch>()
    const setAsFavorite = (post: PostType) => {
        dispatch(setAsFavoriteAction(post))
    }

    const onClickLike = (id: number) => {
        dispatch(likePostThunk(id))
    }

    return (
        <div className={`${styles.BigPost}`}>
            <div className={`${styles.BigPost_UpperPart}`}>
                <div className={`${styles.BigPost_LeftPart}`}>
                    <div>{props.post.date}</div>
                    <div><Link to={'/SelectedPost/' + props.post.id}>{props.post.title}</Link></div>
                    <div>{props.post.text}</div>
                </div>

                <div className={`${styles.BigPost_RightPart}`}>
                    <img src={`${props.post.image}`} />
                </div>
            </div>
            <div className={`${styles.BigPost_BottomPart}`}>
                <div className={`${styles.LikeDislike}`}>
                    <button onClick={() => onClickLike(props.post.id)}><img src={`${optionsState.like}`} /></button>
                    <div>{props.post.author}</div>
                    <button onClick={() => onClickLike(props.post.id)}><img src={`${optionsState.dislike}`} /></button>
                    <div>{props.post.lesson_num}</div>
                </div>
                <div className={`${styles.FavOptions}`}>
                    <button onClick={() => setAsFavorite(props.post)}><img src={`${optionsState.bookmark}`} /></button>
                    <img src={`${optionsState.dots}`} />
                </div>
            </div>

        </div >
    )
}

export default BigPost