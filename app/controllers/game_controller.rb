class GameController < ApplicationController
  def test
    majon_pais = [
      %w[m p s].product([*1..9]).map{ ["#{_1}#{_2}"] * 4 },
      (1..7).map{ ["z#{_1}"] * 4 }
    ].flatten.freeze()

    haipai = majon_pais.sample(14)
    @ripai = haipai
  end
end
