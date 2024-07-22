import Head from 'next/head'; // นำเข้า Head จาก next/head
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { heroSelector } from '@/store/slice/hero.slice';
import RootHeroComponent from '@/component/CardHeroComponent/RootHeroComponent';
import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import { Stack, Typography, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function HeroRovGame() {
  const { namehero } = useParams();
  const [data, setData] = useState<IHeroResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _heroSelecotor = useSelector(heroSelector);

  useEffect(() => {
    setIsLoading(true);

    if (namehero) {
      const newHero = _heroSelecotor.heros.filter((_hero: IHeroResponse) => _hero.name.toLowerCase() === namehero.toLowerCase());

      if (newHero.length > 0) {
        setData(newHero[0]);
      } else {
        setData(null);
      }
    } else {
      setData(null);
    }

    setIsLoading(false);
  }, [namehero, _heroSelecotor.heros]);

  // กำหนด metadata ที่จะใช้
  const metadata = data ? {
    title: `${data.name} | rov-pro.com`,
    description: data.description || `rov ${data.name}`,
    openGraph: {
      title: data.name,
      description: data.description || `rov ${data.name}`,
      images: [data.image || '/default-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.name,
      description: data.description || `Details of hero ${data.name}`,
      images: [data.image || '/default-image.jpg'],
    },
  } : {
    title: "Hero not found | rov-pro.com",
    description: "No hero data available",
    openGraph: {
      title: "Hero not found",
      description: "No hero data available",
      images: ['/default-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Hero not found",
      description: "No hero data available",
      images: ['/default-image.jpg'],
    },
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </Head>
      <Stack sx={{ bgcolor: "background.paper", borderRadius: 2, p: 2, minHeight: 300, width: "100%" }} spacing={2}>
        {
          isLoading ? (
            <React.Fragment>
              <Skeleton variant="rectangular" width="100%" height={300} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </React.Fragment>
          ) : (
            data == null ? (
              <Typography>กรุณาเลือก Hero</Typography>
            ) : (
              <React.Fragment>
                {
                  data && (
                    <React.Fragment>
                      <RootHeroComponent hero={data} design="public" />
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            )
          )
        }
      </Stack>
    </>
  );
}
