

export default function ArticleCard({ data, children }) {



    return (
        <div className="col">
            <div className="card">
                <img src={data.image} className="object-fit-cover card-img-top" alt="" />
                <div className="card-body">
                    <h3>{data.title}</h3>
                    <p>{data.content}</p>
                    <p>{data.category}</p>
                    <p>{data.tags.join(", ")}</p>
                    {children}
                </div>
            </div>
        </div>
    )
}