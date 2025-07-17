import parse from 'html-react-parser'

const showPost = ({content}) => {
  return (
    <div className="editor-shield">
        {parse(content)}
    </div>
  )
}

export default showPost