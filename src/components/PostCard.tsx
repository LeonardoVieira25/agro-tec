import {
  Avatar,
  Box,
  Card,
  CardActions,
  IconButton,
  Typography,
} from '@mui/material';
import { serverTimestamp } from 'firebase/firestore';
import React, { useEffect } from 'react';
import useInteractions from '../hooks/useInteractions';
import { useUserData } from '../hooks/useUserData';
import { Post } from '../types/post';

export default function PostCard({
  post,
  actions,
  parentPostId,
  setScore,
}: {
  post: Post;
  actions?: ((Post: Post) => React.ReactNode)[];
  parentPostId?: string;
  setScore?: (postId: string, score: number) => void;
}) {
  const { userData } = useUserData();
  const { addInteraction, interactions } = useInteractions(post);

  useEffect(() => {
    if (setScore) {
      setScore(
        post.doc.id,
        (interactions?.filter((i) => i.type === 'like').length || 0) -
          (interactions?.filter((i) => i.type === 'dislike').length || 0)
      );
    }
  }, [interactions]);

  function timeAgo(date: Date): string {
    const now = post.createdAt as Date;
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays >= 1) {
      return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours >= 1) {
      return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    } else if (diffMin >= 1) {
      return `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
    } else {
      return 'agora mesmo';
    }
  }

  return (
    <Card
      key={post.doc.id}
      sx={{
        background: '#f4f4f4',
        p: '1.25rem',
        pb: '2.5rem',
        borderRadius: '6px',
        color: '#2e2e2e',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.75rem' }}>
          <Avatar
            alt={'User Avatar'}
            src={
              post.userProfilePictureSrc
                ? post.userProfilePictureSrc
                : 'user.png'
            }
            sx={{
              width: '45px',
              height: '45px',
              border: '2px solid #405DE6',
            }}
          />
          <Typography
            sx={{ fontWeight: '400', fontSize: '1rem', mt: '0.5rem' }}
          >
            {post.userName || 'Anônimo'}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: '400', fontSize: '0.875rem' }}>
          {timeAgo(new Date())}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: ' 400',
          mt: 2,
          wordBreak: 'break-word',
        }}
      >
        {post.text}
      </Typography>
      <CardActions sx={{ p: 0, mt: 2 }}>
        {actions &&
          actions.map((action, i) => (
            <Box key={action.toString() + i}>{action(post)}</Box>
          ))}
        <IconButton
          onClick={() =>
            addInteraction(
              {
                type: interactions?.some(
                  (i) =>
                    i.type === 'like' && i.docId === userData?.firebaseData?.uid
                )
                  ? 'none'
                  : 'like',
                createdAt: serverTimestamp(),
              },
              post,
              parentPostId
            )
          }
        >
          {interactions?.some(
            (i) => i.type === 'like' && i.docId === userData?.firebaseData?.uid
          ) ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3914 19.4562C20.1662 20.9197 18.907 22 17.4262 22H4C2.89543 22 2 21.1046 2 20V13C2 11.8954 2.89543 11 4 11H6.35013C6.74532 11 7.10344 10.7673 7.26394 10.4061L10.7831 2.48812C10.915 2.1913 11.2093 2 11.5342 2C12.896 2 14 3.10399 14 4.46584V8C14 8.55228 14.4477 9 15 9H18.5032C20.3418 9 21.7479 10.6389 21.4683 12.4562L20.3914 19.4562Z"
                fill="#4285F4"
              />
              <path
                d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
                stroke="#202024"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
                stroke="#4285F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <Typography style={{ marginLeft: '0.5rem'}}>
            {interactions?.filter((i) => i.type === 'like').length}
          </Typography>
        </IconButton>

        <IconButton
          onClick={() =>
            addInteraction(
              {
                type: interactions?.some(
                  (i) =>
                    i.type === 'dislike' &&
                    i.docId === userData?.firebaseData?.uid
                )
                  ? 'none'
                  : 'dislike',
                createdAt: serverTimestamp(),
              },
              post,
              parentPostId
            )
          }
        >
          {interactions?.some(
            (i) =>
              i.type === 'dislike' && i.docId === userData?.firebaseData?.uid
          ) ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.60864 4.54383C3.8338 3.08033 5.09304 2 6.57376 2L20 2C21.1046 2 22 2.89543 22 4L22 11C22 12.1046 21.1046 13 20 13H17.6499C17.2547 13 16.8966 13.2327 16.7361 13.5939L13.2169 21.5119C13.085 21.8087 12.7907 22 12.4658 22C11.104 22 10 20.896 10 19.5342V16C10 15.4477 9.55228 15 9 15H5.49683C3.65818 15 2.25214 13.3611 2.53172 11.5438L3.60864 4.54383Z"
                fill="#4285F4"
              />
              <path
                d="M17 2L17 13M22 11L22 4C22 2.89543 21.1046 2 20 2L6.57376 2C5.09304 2 3.8338 3.08033 3.60864 4.54383L2.53172 11.5438C2.25214 13.3611 3.65818 15 5.49683 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z"
                stroke="#202024"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 2L17 13M22 11L22 4C22 2.89543 21.1046 2 20 2L6.57376 2C5.09304 2 3.8338 3.08033 3.60864 4.54383L2.53172 11.5438C2.25214 13.3611 3.65818 15 5.49683 15H9C9.55228 15 10 15.4477 10 16V19.5342C10 20.896 11.104 22 12.4658 22C12.7907 22 13.085 21.8087 13.2169 21.5119L16.7361 13.5939C16.8966 13.2327 17.2547 13 17.6499 13H20C21.1046 13 22 12.1046 22 11Z"
                stroke="#4285F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
