import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  PaginationItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCount, getPageTruyen } from '../api'
import { CardTruyen } from './CardTruyen'
import { SideBar } from './SideBar'
import { Truyen } from './types'

const MainPage = () => {
  const [listTruyen, setListTruyen] = useState<
    Array<Pick<Truyen, 'url' | 'slug' | 'title' | 'cover'>>
  >([])
  const [totalPage, setTotalPage] = useState<number>(1)
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' })

  useEffect(() => {
    if (!(Number(searchParams.get('page')) > 0)) {
      setSearchParams({ page: '1' })
    }
    getPageTruyen(Number(searchParams.get('page'))).then((truyens) => {
      if (truyens) {
        setListTruyen(truyens)
      }
    })
  }, [searchParams, setSearchParams])

  useEffect(() => {
    getCount().then((total) => {
      setTotalPage(total)
    })
  }, [])

  if (!listTruyen.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={4}>
      <Grid item container spacing={2} columnSpacing={2} xs={8}>
        {listTruyen.map((truyen) => (
          <Grid key={truyen.slug} item xs={2.4}>
            <Link
              to={`truyen-tranh/${truyen.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <CardTruyen truyen={truyen} />
            </Link>
          </Grid>
        ))}
        <Container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            margin: '16px 0',
          }}
        >
          <Pagination
            showFirstButton
            showLastButton
            count={totalPage}
            color="primary"
            page={Number(searchParams.get('page')) || 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Container>
      </Grid>
      <Grid item xs={4}>
        <SideBar />
      </Grid>
    </Grid>
  )
}

export default MainPage
