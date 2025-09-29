import "./Size.css";
export default function Size() {
  const lis = document.querySelectorAll("li");

  lis.forEach((li) => {
    li.addEventListener('click', function() {
        lis.forEach((e) => {
            e.classList.remove('active')
        })
        li.classList.add('active')
    })
  });

  return (
    <div className="d-flex gap-3 align-items-center">
      <h4 className="mb-4">Size :</h4>
      <ul className="size">
        <li className="active">XS</li>
        <li>S</li>
        <li>M</li>
        <li>L</li>
        <li>XL</li>
      </ul>
    </div>
  );
}
