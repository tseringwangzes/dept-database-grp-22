function TableStudentAwards({data,columns}){
    return(
        <>
        <table>
        <thead>
          <tr>
            <th class="border border-black p-2">Faculty Name</th>
            <th class="border border-black p-2">Student Name</th>
            <th class="border border-black p-2">Award Name</th>
            <th class="border border-black p-2">Award Reason</th>
            <th class="border border-black p-2">Date</th>
            <th class="border border-black p-2">Shared With</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.columns[0]}>
            <td class="border border-black p-2"> {item.columns[0]}</td>
              <td class="border border-black p-2">{item.columns[1]}</td>
              <td class="border border-black p-2">{item.columns[2]}</td>
              <td class="border border-black p-2">{item.columns[3]}</td>
              <td class="border border-black p-2">{item.columns[4]}</td>
              <td class="border border-black p-2">{item.columns[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
    )

}