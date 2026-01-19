import React, { Component } from "react";

class AboutUs extends Component {
  render() {
    return (
      <div style={styles.container}>
        {/* Page Title */}
        <div style={styles.titleWrapper}>
          <span style={styles.title}>ABOUT US</span>
        </div>

        {/* Content */}
        <div style={styles.content}>
          <p>
            <strong>Department of Excise, Govt. of Delhi:</strong> Revenue is the
            most important input for an able, efficient, and resourceful
            administration. In India since ancient times, there has been a
            well-planned, well-defined, clear, strong and just system of revenue
            collection. With the passage of time there have been changes in the
            system of revenue collection. Today we find various tax free items,
            which were earlier used to be taxed. According to the needs of
            changing times and a big gap between sources of livelihood and the
            resources, new sources of revenue have also been developed. To
            provide a self-reliant administration for a welfare state, making
            efforts for developing new sources of revenue while plugging
            loopholes in the existing ones is an increasing necessity.
          </p>

          <p>
            After the formation of a popular Government in the National Capital
            Territory of Delhi, Excise and Entertainment Taxes have evolved as
            important instruments of revenue collection. There has been a
            significant improvement in tapping of revenue through them. Along
            with these there have been significant efforts to develop new sources
            of revenue; Luxury Tax on hospitality industry thus came into being.
            Apart from fulfilling its primary responsibility of revenue
            collection, the Commissionerate controls and regulates the liquor,
            intoxicants and narcotics trade.
          </p>

          <p>
            This is amply indicative of the achievement of this Commissionerate
            that with a very limited work force it collects an important
            proportion of revenue at unbelievably low collection cost. To be
            precise, approx. 25% contribution of total revenue of Govt. of Delhi
            at less than half per cent collection cost.
          </p>

          <p>
            Excise Department is the second largest revenue earning department of
            the Government of Delhi and is one of the three constituents of a
            Commissionerate, along with Luxury Tax and Entertainment Tax.
          </p>

          {/* Excise Department */}
          <h3 style={styles.heading}>EXCISE DEPARTMENT</h3>
          <p>
            Excise Department is the major revenue-earning department. Apart from
            fulfilling its primary responsibility of revenue collection, the
            department controls and regulates the liquor intoxicants and
            narcotics trade and discharges the responsibility of making available
            the same in safe quality to the consumers. For regulation and
            monitoring the functions, the statutory powers for discharging the
            responsibilities are taken from Delhi Excise Act, 2009 and Medicinal
            & Toilet Preparation Act, 1955 and rules made thereunder.
          </p>

          {/* Entertainment Tax Department */}
          <h3 style={styles.heading}>ENTERTAINMENT TAX DEPARTMENT</h3>
          <p>
            The Entertainment Tax department deals with the collection of
            entertainment tax leviable on all entertainments / amusements like
            Cinema, Theatre, Ticketed sports events, Cable TV, Fun Parks,
            Betting, Floorshows and variety entertainments.
          </p>

          {/* Luxury Tax Department */}
          <h3 style={styles.heading}>LUXURY TAX DEPARTMENT</h3>
          <p>
            The luxury tax has been introduced w.e.f. 01.11.1996 vide notification
            No. F.10(105)/95/-Fin(G) dt. 31.10.1996 and at present is being charged
            @ 10% w.e.f. 22.06.2009 on declared tariff. The definition of ‘Hotel’
            may be read as - hotel includes a residential accommodation, a
            lodging house, an inn, a club, a resort, a farm house, a public house
            or a building or part of a building, where a residential
            accommodation is provided by way of business.
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#000",
  },
  titleWrapper: {
    borderBottom: "2px solid #ddd",
    marginBottom: "20px",
  },
  title: {
    backgroundColor: "#f4c400",
    padding: "6px 12px",
    fontWeight: "bold",
    display: "inline-block",
  },
  content: {
    textAlign: "justify",
  },
  heading: {
    color: "#0033cc",
    marginTop: "20px",
  },
};

export default AboutUs;
