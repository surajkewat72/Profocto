const Certification = ({ title, certifications }) => {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="section-title mb-1 border-b-2 border-gray-300">{title}</h2>
      <ul className="list-disc ul-padding sub-content">
        {certifications.map((certification, index) => (
          <li key={index} className="leading-normal">
            {certification.name}
            {certification.issuer && (
              <span className="text-gray-600"> - {certification.issuer}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certification;