import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import { Image, Row, Col, Pagination } from 'antd';

const Prompt = () => {
  const baseUrl = "https://colgi-image.s3.ap-northeast-2.amazonaws.com/";

  let { prefix } = useParams();

  const [prompt, setPrompt] = useState(null);
  const [items, setItem] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [pageSize, setPageSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    setPrompt(prefix)

    axios.get(`/items?prefix=${prefix}&page=${currentPage}&cnt=${pageSize}`)
      .then(resp => {
        setItem(resp.data.items);
        setTotalCount(resp.data.totalCount);
        setTotalPage(parseInt(resp.data.totalCount / pageSize) + 1)
      })
  }, [prefix])

  const onChange = (page) => {
    setCurrentPage(page)

    axios.get(`/items?prefix=${prefix}&page=${page}&cnt=${pageSize}`)
      .then(resp => {
        console.log(resp);
        setItem(resp.data.items);
        setTotalCount(resp.data.totalCount);
        setTotalPage(parseInt(resp.data.totalCount / pageSize) + 1)
      })
  }

  return (
    <>
      <Row style={{marginBottom: '20px'}}> { prompt && totalCount && `${prompt} (Total: ${totalCount})` } </Row>

      <Row>
      {items && items.map(image => (
        <Col span={4}>
          <Image
            src={`${baseUrl}${image.Key}`}
          />
        </Col>
      ))}
      </Row>

      { totalPage && <Pagination onChange={onChange} style={{ marginTop: '20px'}} current={currentPage} pageSize={pageSize} total={totalCount} />}
    </>
  )
}

export default Prompt
